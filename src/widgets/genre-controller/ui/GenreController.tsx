import { Carousel } from "@/shared/ui";
import { GenreCard } from "@/shared/ui";
import { useGenresPosters } from "@/entities/genres/hooks";



export const GenreController = ({ heading, subtitle }: { heading: string, subtitle: string }) => {
    const { data, isLoading } = useGenresPosters();

    return (
        <Carousel
            heading={heading}
            subtitle={subtitle}
            data={data || []}
            renderItem={(genre) => <GenreCard genre={genre.name} images={genre.posters} />}
        />
    );
};