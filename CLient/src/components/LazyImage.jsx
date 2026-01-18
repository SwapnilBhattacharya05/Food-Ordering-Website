import { useState, useEffect } from 'react';

/**
 * LazyImage component for optimized image loading
 * Supports lazy loading, loading placeholders, and error fallbacks
 */
const LazyImage = ({
  src,
  alt = '',
  className = '',
  style = {},
  fallbackSrc = 'https://via.placeholder.com/300x200?text=Image+Not+Found',
  loadingPlaceholder = null,
  width,
  height,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(loadingPlaceholder);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setImageSrc(fallbackSrc);
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

  return (
    <>
      {isLoading && loadingPlaceholder ? (
        loadingPlaceholder
      ) : (
        <img
          src={imageSrc}
          alt={alt}
          className={className}
          style={style}
          loading="lazy"
          width={width}
          height={height}
          {...props}
        />
      )}
    </>
  );
};

export default LazyImage;
