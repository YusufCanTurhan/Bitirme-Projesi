export const PLACEHOLDER_COVER_SM =
  'https://placehold.co/100x100/e2e8f0/64748b?text=Şehir'

export const PLACEHOLDER_COVER_LG =
  'https://placehold.co/800x600/e2e8f0/64748b?text=Şehir'

export function getCoverImage(coverImage, size = 'lg') {
  if (coverImage) return coverImage
  return size === 'sm' ? PLACEHOLDER_COVER_SM : PLACEHOLDER_COVER_LG
}
