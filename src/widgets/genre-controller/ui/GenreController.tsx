import { Carousel, CardsSkeleton, GenreCard } from "@/shared/ui";
import { useGenresPosters } from "@/entities/genres/hooks";
import { useNavigate } from "react-router-dom"; // Добавляем навигацию
import { Box } from "@chakra-ui/react";

export const GenreController = ({
  heading,
  subtitle,
}: {
  heading: string;
  subtitle?: string;
}) => {
  const { data, isLoading } = useGenresPosters();
  const navigate = useNavigate();

  return (
    <Carousel
      heading={heading}
      subtitle={subtitle}
      data={data || []}
      isLoading={isLoading}
      renderSkeleton={() => <CardsSkeleton />}
      renderItem={(item) => (
        <Box
          onClick={() => navigate(`/genre/${item.id}`)}
          cursor="pointer"
          w="full"
        >
          <GenreCard
            genre={item.displayName}
            images={item.posters}
          />
        </Box>
      )}
    />
  );
};