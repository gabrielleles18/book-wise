import {Rating, RoundedStar} from "@smastrom/react-rating";
import {theme} from "@/styles/themes/default";
import {useState} from "react";

interface StarRatingProps {
    handleSetStarRating?: (rating: number) => void;
}

export function StarRating({handleSetStarRating}: StarRatingProps) {
    const [rating, setRating] = useState(0);

    return (
        <Rating
            style={{maxWidth: 96}}
            value={rating}
            onChange={setRating}
            itemStyles={{
                itemShapes: RoundedStar,
                activeFillColor: theme.colors.gray['200'],
                inactiveFillColor: theme.colors.gray['600'],
            }}
        />
    );
}
