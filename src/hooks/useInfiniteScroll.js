import { useCallback, useRef } from 'react';

export const useInfiniteScroll = ({
  hasNextPage,
  isFetching,
  onLoadMore,
  rootMargin = '320px',
}) => {
  const observerRef = useRef(null);
  const hasNextPageRef = useRef(hasNextPage);
  const isFetchingRef = useRef(isFetching);
  const onLoadMoreRef = useRef(onLoadMore);

  hasNextPageRef.current = hasNextPage;
  isFetchingRef.current = isFetching;
  onLoadMoreRef.current = onLoadMore;

  const lastElementRef = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node || !hasNextPageRef.current || isFetchingRef.current) {
        return;
      }

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasNextPageRef.current && !isFetchingRef.current) {
            isFetchingRef.current = true;
            observerRef.current?.disconnect();
            onLoadMoreRef.current();
          }
        },
        { rootMargin }
      );

      observerRef.current.observe(node);
    },
    [hasNextPage, isFetching, rootMargin]
  );

  return lastElementRef;
};
