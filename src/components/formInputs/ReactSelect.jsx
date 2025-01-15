import PropTypes from "prop-types";

import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const options = [
  { value: "politics", label: "Politics" },
  { value: "business", label: "Business" },
  { value: "technology", label: "Technology" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "entertainment", label: "Entertainment" },
  { value: "sports", label: "Sports" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "world_news", label: "World News" },
  { value: "environment", label: "Environment" },
  { value: "education", label: "Education" },
  { value: "opinion", label: "Opinion" },
  { value: "breaking_news", label: "Breaking News" },
  { value: "economy", label: "Economy" },
  { value: "finance", label: "Finance" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "culture", label: "Culture" },
  { value: "technology_reviews", label: "Technology Reviews" },
  { value: "fashion", label: "Fashion" },
  { value: "weather", label: "Weather" },
  { value: "local_news", label: "Local News" },
  { value: "real_estate", label: "Real Estate" },
  { value: "jobs", label: "Jobs" },
  { value: "art", label: "Art" },
  { value: "automotive", label: "Automotive" },
  { value: "books", label: "Books" },
  { value: "movies", label: "Movies" },
  { value: "music", label: "Music" },
  { value: "television", label: "Television" },
];

const ReactSelect = ({ field }) => {
  return (
    <Select
      options={options}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      {...field}
    />
  );
};

ReactSelect.propTypes = {
  field: PropTypes.object.isRequired,
};

export default ReactSelect;
