import {Rating, RoundedStar} from "@smastrom/react-rating";
import {theme} from "@/styles/themes/default";
import {useState} from "react";

interface StarRatingProps {
    rate: number;
    isDisabled?: boolean;
}

export function StarRating({rate = 0, isDisabled = true}: StarRatingProps) {
    const [rating, setRating] = useState(rate);

    return (
        <Rating
            style={{maxWidth: 96}}
            value={rating}
            onChange={setRating}
            isDisabled={isDisabled}
            itemStyles={{
                itemShapes: RoundedStar,
                activeFillColor: theme.colors.gray['200'],
                inactiveFillColor: theme.colors.gray['600'],
            }}
        />
    );
}
