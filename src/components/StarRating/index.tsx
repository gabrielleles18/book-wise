import {Rating, RoundedStar} from "@smastrom/react-rating";
import {theme} from "@/styles/themes/default";
import {useEffect, useState} from "react";
import '@smastrom/react-rating/style.css'

interface StarRatingProps {
    rate: number;
    isDisabled?: boolean;
    onRateChange?: (newRate: number) => void;
}

export function StarRating({rate = 0, isDisabled = true, onRateChange}: StarRatingProps) {
    const [rating, setRating] = useState<number>(rate);

    useEffect(() => {
        onRateChange && onRateChange(rating);
    }, [rating, onRateChange]);

    return (
        <Rating
            style={{maxWidth: 96, opacity: 1}}
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
