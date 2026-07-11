import "./../styles/CodeType.css";

interface CodeTypeProps {
  imgSrc: string;
  heading: string;
  subHeading: string;
  buttonText: string;
  buttonClassName?: string;
  handleClick?: () => void;
  buttonLink?: string;
}

export default function CodeType({
  imgSrc,
  heading,
  subHeading,
  buttonText,
  buttonClassName = "primary",
  handleClick,
}: CodeTypeProps) {
  // const handleClick = () => {
  //   if (onClick) {
  //     onClick();
  //   } else if (buttonLink) {
  //     window.location.href = buttonLink;
  //   }
  // };

  return (
    <div className="type-body">
      <img src={imgSrc} alt={heading} className="type-img" />

      <div className="type-text">
        <div className="text-heading">{heading}</div>
        <div className="text-sub_heading">{subHeading}</div>
      </div>

      <div className="type-button">
        <button className={buttonClassName} onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
