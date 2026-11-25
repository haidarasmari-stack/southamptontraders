import type { OwnerProjectPhoto } from "@/data/projectPhotos";

type OwnerProjectGalleryProps = {
  title: string;
  photos: OwnerProjectPhoto[];
};

export default function OwnerProjectGallery({ title, photos }: OwnerProjectGalleryProps) {
  if (!photos.length) return null;

  return (
    <section className="owner-project-gallery section-block" aria-labelledby="owner-project-gallery-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Site-owner supplied photos</p>
          <h2 id="owner-project-gallery-title">{title}</h2>
        </div>
      </div>
      <p className="owner-project-gallery-note">
        Owner-supplied photos show construction work in progress. They are not attributed to a listed business and do not constitute a recommendation.
      </p>
      <div className="owner-project-gallery-grid">
        {photos.map((photo) => (
          <figure className="owner-project-photo" key={photo.src}>
            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
