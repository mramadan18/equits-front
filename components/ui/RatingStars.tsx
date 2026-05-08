import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center [--rating-max-width:60px] sm:[--rating-max-width:100px]">
      <Rating
        value={rating}
        readOnly
        style={{ maxWidth: "var(--rating-max-width)" }}
        itemStyles={{
          itemShapes: RoundedStar,
          activeFillColor: "#facc15", // tailwind yellow-400
          inactiveFillColor: "#e4e4e7", // tailwind gray-200
        }}
      />
    </div>
  );
};
