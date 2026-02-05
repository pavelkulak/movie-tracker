import { useParams } from "react-router-dom";
import { useMovie, useMovieCredits, useMovieReviews, useMovieVideos } from "@/entities/movie/hooks";
import {
  VStack, Box, Text, Grid, GridItem, Heading,
  HStack, Badge, Flex, Icon, Image, Button,
  Dialog
} from "@chakra-ui/react";
import { Carousel } from "@/shared/ui";
import { HeroSlider } from "@/widgets";
import { useTranslate } from "@/shared/i18n";
import { locales } from "./locales";
import {
  LuCalendar, LuLanguages, LuStar, LuLayoutGrid, LuPlus, LuUser
} from "react-icons/lu";
import { useState } from "react";

const TMDB_IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_URL;

export const MoviePage = () => {
  const t = useTranslate(locales);
  const { movieId } = useParams();
  const [open, setOpen] = useState(false); // Замена useDisclosure
  const { data: movie, isLoading: isMovieLoading } = useMovie(Number(movieId));
  const { data: credits, isLoading: isCreditsLoading } = useMovieCredits(Number(movieId));
  const { data: reviews, isLoading: isReviewsLoading } = useMovieReviews(Number(movieId));
  const { data: videos, isLoading: isVideosLoading } = useMovieVideos(Number(movieId));

  const isLoading = isMovieLoading || isCreditsLoading || isReviewsLoading || isVideosLoading;

  const trailer = videos?.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  ) || videos?.results?.[0];

  // Поиск ключевых персон
  const director = credits?.crew.find(c => c.job === "Director");
  const composer = credits?.crew.find(c => c.job === "Original Music Composer" || c.job === "Music");


  return (
    <VStack gap={{ base: "30px", lg: "50px" }} align="stretch" bg="black" color="white" minH="100vh">
      <HeroSlider type="movie" movieId={movieId} onOpenVideo={() => setOpen(true)} />

      <Box w="full" px={{ base: "16px", md: "40px", lg: "80px", xl: "162px" }} pb="100px">
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 380px", xl: "1fr 420px" }}
          gap={{ base: "20px", lg: "30px" }}
          alignItems="stretch"
        >
          {/* ЛЕВАЯ КОЛОНКА */}
          <VStack gap="30px" align="stretch" minW="0">
            {/* 1. Description */}
            <Box bg="dark.10" border="1px solid" borderColor="dark.15" rounded="12px" p={{ base: "24px", md: "40px" }}>
              <Heading size="md" mb="12px" fontWeight="medium">{t("description")}</Heading>
              <Text color="gray.60" fontSize="md" lineHeight="tall">{movie?.overview}</Text>
            </Box>

            {/* 2. Cast */}
            <Box bg="dark.10" border="1px solid" borderColor="dark.15" rounded="12px" p={{ base: "24px", md: "40px" }}>
              <Heading size="md" fontWeight="medium" mb="24px">{t("cast")}</Heading>
              <Box mx="-4px">
                <Carousel
                  data={credits?.cast?.filter(a => a.profile_path).slice(0, 15) || []}
                  isLoading={isLoading}
                  renderItem={(actor) => (
                    <Box key={actor.id} px="1" w="full">
                      <Box overflow="hidden" rounded="12px" bg="dark.15" aspectRatio={2 / 3}>
                        <Image
                          src={getPersonImage(actor.profile_path, actor.name)}
                          alt={actor.name}
                          w="full"
                          h="full"
                          objectFit="cover"
                          // На случай если ссылка из TMDB битая
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=222&color=fff`;
                          }}
                        />
                      </Box>
                      <VStack align="start" mt="8px" gap="0">
                        <Text fontSize="xs" fontWeight="medium" lineClamp={1}>{actor.name}</Text>
                        <Text fontSize="10px" color="gray.60" lineClamp={1}>{actor.character}</Text>
                      </VStack>
                    </Box>
                  )}
                />
              </Box>
            </Box>

            {/* 3. Real Reviews */}
            <Box bg="dark.10" border="1px solid" borderColor="dark.15" rounded="12px" p={{ base: "24px", md: "40px" }}>
              <Flex justify="space-between" align="center" mb="24px">
                <Heading size="md" fontWeight="medium">{t("reviews")}</Heading>
              </Flex>
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="20px">
                {reviews?.results?.length ? (
                  reviews.results.map((rev: any) => (
                    <ReviewCard
                      key={rev.id}
                      name={rev.author}
                      rating={rev.author_details?.rating || 0}
                      content={rev.content}
                    />
                  ))
                ) : (
                  <Text color="gray.60">{t("no_reviews")}</Text>
                )}
              </Grid>
            </Box>
          </VStack>

          {/* ПРАВАЯ КОЛОНКА */}
          <GridItem rowSpan={{ lg: 3 }}>
            <Box bg="dark.10" border="1px solid" borderColor="dark.15" rounded="12px" p={{ base: "24px", md: "40px" }} h="full">
              <VStack gap="32px" align="stretch">
                <Box>
                  <HStack color="gray.60" mb="8px"><Icon as={LuCalendar} /><Text fontSize="sm">{t("released_year")}</Text></HStack>
                  <Text fontSize="xl" fontWeight="bold">{movie?.release_date?.split("-")[0]}</Text>
                </Box>

                {/* Director with Photo */}
                <Box>
                  <HStack color="gray.60" mb="12px"><Icon as={LuUser} /><Text fontSize="sm">{t("director")}</Text></HStack>
                  <HStack gap="12px">
                    <Image
                      src={getPersonImage(director?.profile_path, director?.name || "N/A")}
                      boxSize="50px"
                      rounded="8px"
                      objectFit="cover"
                      bg="dark.15"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50';
                      }}
                    />
                    <Text fontSize="lg" fontWeight="bold">{director?.name || "N/A"}</Text>
                  </HStack>
                </Box>

                {/* Composer with Photo */}
                <Box>
                  <HStack color="gray.60" mb="12px"><Icon as={LuUser} /><Text fontSize="sm">{t("music")}</Text></HStack>
                  <HStack gap="12px">
                    <Image
                      src={getPersonImage(composer?.profile_path, composer?.name || "N/A")}
                      boxSize="50px"
                      rounded="8px"
                      objectFit="cover"
                      bg="dark.15"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50';
                      }}
                    />
                    <Text fontSize="lg" fontWeight="bold">{composer?.name || "N/A"}</Text>
                  </HStack>
                </Box>

                <Box>
                  <HStack color="gray.60" mb="12px"><Icon as={LuLanguages} /><Text fontSize="sm">{t("language")}</Text></HStack>
                  <HStack gap="8px" wrap="wrap">
                    {movie?.spoken_languages?.map(lang => (
                      <Badge key={lang.iso_639_1} bg="dark.15" p="8px 12px" color="white" textTransform="none" rounded="md" fontWeight="normal">{lang.name}</Badge>
                    ))}
                  </HStack>
                </Box>

                {/* Combined Ratings */}
                <Box>
                  <HStack color="gray.60" mb="12px"><Icon as={LuStar} /><Text fontSize="sm">{t("rating")}</Text></HStack>
                  <Grid templateColumns="1fr 1fr" gap="12px">
                    <Box bg="dark.6" p="12px" border="1px solid" borderColor="dark.15" rounded="12px">
                      <Text fontSize="xs" color="gray.60" mb="1">IMDb</Text>
                      <HStack><Text fontWeight="bold" fontSize="md">{movie?.vote_average?.toFixed(1)}</Text><Icon as={LuStar} color="yellow.400" boxSize="3" /></HStack>
                    </Box>
                    <Box bg="dark.6" p="12px" border="1px solid" borderColor="dark.15" rounded="12px">
                      <Text fontSize="xs" color="gray.60" mb="1">Кинопоиск</Text>
                      <HStack><Text fontWeight="bold" fontSize="md">8.1</Text><Icon as={LuStar} color="orange.400" boxSize="3" /></HStack>
                    </Box>
                  </Grid>
                </Box>

                <Box>
                  <HStack color="gray.60" mb="12px"><Icon as={LuLayoutGrid} /><Text fontSize="sm">{t("genres")}</Text></HStack>
                  <HStack gap="8px" wrap="wrap">
                    {movie?.genres?.map(g => (
                      <Badge key={g.id} bg="dark.15" p="8px 12px" color="white" textTransform="none" rounded="md" fontWeight="normal">{g.name}</Badge>
                    ))}
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Box>
      Это происходит потому, что Dialog.Positioner в Chakra v3 по умолчанию может выравнивать контент по верхнему краю, а size="full" в сочетании с прозрачным фоном создает иллюзию «маленького» окна.

      Чтобы сделать плеер крупным и строго по центру, нам нужно:

      Явно задать alignItems="center" для позиционера.

      Использовать ширину vw (viewport width) для контейнера видео.

      Убрать лишние отступы Dialog.Body.

      Исправленный код модалки (Центрированный и Крупный)
      TypeScript
      <Dialog.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        size="full" // Используем full для мобильной адаптивности
      >
        <Dialog.Backdrop bg="rgba(0, 0, 0, 0.95)" backdropFilter="blur(15px)" zIndex="1000" />

        <Dialog.Positioner
          zIndex="1001"
          display="flex"
          alignItems="center" // Центрирует по вертикали
          justifyContent="center" // Центрирует по горизонтали
        >
          <Dialog.Content
            bg="transparent"
            boxShadow="none"
            p="0"
            border="none"
            w="100vw" // Растягиваем на всю ширину экрана
            maxW="1400px" // Но ограничиваем на очень больших мониторах
          >
            {/* Кнопка закрытия — увеличили для удобства */}
            <Dialog.CloseTrigger
              position="absolute"
              top={{ base: "-50px", md: "0" }} // На мобилках выносим выше видео
              right="4"
              zIndex="1002"
            >
              <Button
                variant="ghost"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
                rounded="full"
                size="lg"
              >
                <LuPlus style={{ transform: 'rotate(45deg)', width: '30px', height: '30px' }} />
              </Button>
            </Dialog.CloseTrigger>

            <Dialog.Body p={{ base: "2", md: "10" }} w="full">
              {/* Контейнер видео */}
              <Box
                position="relative"
                pt="56.25%" // Соотношение 16:9
                w="full"
                bg="black"
                rounded={{ base: "md", md: "2xl" }}
                overflow="hidden"
                boxShadow="0 0 100px rgba(0,0,0,0.5)"
              >
                {trailer?.key && (
                  <iframe
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none"
                    }}
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </VStack>
  );
};

interface ReviewCardProps {
  name: string;
  rating: number;
  content: string;
  avatar?: string | null;
}

const ReviewCard = ({ name, rating, content, avatar }: ReviewCardProps) => {
  // Проверяем, есть ли аватар и не является ли он просто заглушкой
  const avatarUrl = avatar
    ? `${TMDB_IMAGE_BASE}/w45${avatar}`
    : `https://ui-avatars.com/api/?name=${name}&background=random`;
  // ui-avatars — отличная штука, рисует буквы имени, если нет фото

  return (
    <Box bg="dark.6" p="20px" rounded="12px" border="1px solid" borderColor="dark.15">
      <Flex justify="space-between" align="center" mb="4">
        <HStack gap="3">
          <Image
            src={avatarUrl}
            // Если ссылка битая (404), подставляем дефолтную картинку
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
            }}
            boxSize="40px"
            rounded="full"
            objectFit="cover"
            bg="dark.15" // Фон, пока картинка грузится
          />
          <VStack align="start" gap="0">
            <Text fontWeight="bold" fontSize="sm" lineClamp={1}>{name}</Text>
            <Text fontSize="xs" color="gray.60">User</Text>
          </VStack>
        </HStack>

        <Badge bg="dark.15" color="white" p="4px 8px" rounded="full" display="flex" alignItems="center" gap="1">
          <Icon as={LuStar} color="yellow.400" boxSize="12px" />
          <Text fontSize="xs">{rating > 0 ? rating.toFixed(1) : "—"}</Text>
        </Badge>
      </Flex>

      <Text fontSize="xs" color="gray.60" lineClamp={4} lineHeight="tall">
        {content}
      </Text>
    </Box>
  );
};

const getPersonImage = (path: string | null | undefined, name: string) => {
  if (path) return `${TMDB_IMAGE_BASE}/w185${path}`;
  // Если фото нет, генерируем аватар с инициалами
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=222&color=fff&size=128`;
};
