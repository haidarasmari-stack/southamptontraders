export type OwnerProjectPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export const ownerProjectPhotos = {
  roofTiles: {
    src: "/manus-storage/IMG_6247_597a3dba.webp",
    alt: "Red roof tiles being fitted across a residential roof with scaffolding visible below",
    caption: "Roof tiling in progress",
  },
  roofFrame: {
    src: "/manus-storage/IMG_6093_5457ae68.webp",
    alt: "Timber roof trusses viewed from above during construction",
    caption: "Timber roof structure",
  },
  rafterDetail: {
    src: "/manus-storage/IMG_6156_ff18d1e5.webp",
    alt: "Close view of timber rafters and insulation above a brick wall",
    caption: "Rafter and insulation detail",
  },
  roomInProgress: {
    src: "/manus-storage/IMG_6867_a5bd0603.webp",
    alt: "Interior room renovation in progress with work materials on the floor",
    caption: "Room renovation in progress",
  },
  interiorFinish: {
    src: "/manus-storage/IMG_6868_9290dbcf.webp",
    alt: "Unfinished interior with a new window, prepared walls and tools on the floor",
    caption: "Interior finishing work",
  },
} satisfies Record<string, OwnerProjectPhoto>;
