import { Carousel } from "@/shared/ui";
import { GenreCard } from "@/shared/ui";
import { useGenresPosters } from "@/entities/genres/hooks";
import { CardsSkeleton } from "@/shared/ui";

export const GenreController = ({
  heading,
  subtitle,
}: {
  heading: string;
  subtitle?: string;
}) => {
  const { data, isLoading } = useGenresPosters();

  return (
    <Carousel
      heading={heading}
      subtitle={subtitle}
      data={data || []}
      isLoading={isLoading}
      renderSkeleton={() => <CardsSkeleton />}
      renderItem={(item) => (
        <GenreCard genre={item.name} images={item.posters} />
      )}
    />
  );
};
