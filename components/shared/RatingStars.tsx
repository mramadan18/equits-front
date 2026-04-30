import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      <Rating
        value={rating}
        readOnly
        style={{ maxWidth: 100 }}
        itemStyles={{
          itemShapes: RoundedStar,
          activeFillColor: "#facc15", // tailwind yellow-400
          inactiveFillColor: "#e4e4e7", // tailwind gray-200
        }}
      />
    </div>
  );
};

export default RatingStars;
