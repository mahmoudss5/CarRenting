import { Link } from "react-router-dom";
import PrimaryButton from "../components/ui/PrimaryButton";
import StatusChip from "../components/ui/StatusChip";
import OwnerPageLayout from "./components/OwnerPageLayout";
import useOwnerHome from "./hooks/useOwnerHome";

function PostCard({ post }) {
  const statusVariant =
    post.ownerRentalStatus === "Active"
      ? "verified"
      : post.ownerRentalStatus === "Pending"
      ? "pending"
      : "featured";

  return (
    <article className="rounded-card bg-surface-low p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-display text-title-md text-on-surface">{post.title}</p>
          <p className="mt-1 font-body text-body-md text-on-surface/75">
            {post.brand} {post.model} - {post.year}
          </p>
          <p className="mt-2 font-body text-body-md text-on-surface/75">{post.description}</p>
        </div>
        <StatusChip label={post.ownerRentalStatus} variant={statusVariant} />
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-surface-lowest p-4">
          <p className="font-body text-label-sm uppercase text-on-surface/55">Car Type</p>
          <p className="mt-1 font-body text-body-md text-on-surface">{post.carType}</p>
        </div>
        <div className="rounded-lg bg-surface-lowest p-4">
          <p className="font-body text-label-sm uppercase text-on-surface/55">Transmission</p>
          <p className="mt-1 font-body text-body-md text-on-surface">{post.transmission}</p>
        </div>
        <div className="rounded-lg bg-surface-lowest p-4">
          <p className="font-body text-label-sm uppercase text-on-surface/55">Price / Day</p>
          <p className="mt-1 font-body text-body-md text-on-surface">${post.rentalPrice}</p>
        </div>
        <div className="rounded-lg bg-surface-lowest p-4">
          <p className="font-body text-label-sm uppercase text-on-surface/55">Fuel Type</p>
          <p className="mt-1 font-body text-body-md text-on-surface">{post.fuelType}</p>
        </div>
        <div className="rounded-lg bg-surface-lowest p-4">
          <p className="font-body text-label-sm uppercase text-on-surface/55">Seats</p>
          <p className="mt-1 font-body text-body-md text-on-surface">{post.seats}</p>
        </div>
        <div className="rounded-lg bg-surface-lowest p-4">
          <p className="font-body text-label-sm uppercase text-on-surface/55">Mileage</p>
          <p className="mt-1 font-body text-body-md text-on-surface">{post.mileage}</p>
        </div>
      </div>
      <div className="mt-4 rounded-md bg-surface-high p-4">
        <p className="font-body text-label-sm uppercase text-on-surface/60">Post Details</p>
        <p className="mt-1 font-body text-body-md text-on-surface/75">
          Owner: {post.ownerName} • Location: {post.location}
        </p>
        <p className="mt-1 font-body text-body-md text-on-surface/75">
          Availability: {post.availability} • Min Rental: {post.minRentalDays} day(s)
        </p>
      </div>
    </article>
  );
}

export default function OwnerHome() {
  const { posts, stats } = useOwnerHome();

  return (
    <OwnerPageLayout>
      <section className="relative overflow-hidden rounded-card bg-surface-low p-6 md:p-8">
        <div className="absolute -right-14 top-6 h-44 w-44 rounded-full bg-primary/10 blur-2xl" />
        <div className="glass-surface relative max-w-[760px] rounded-lg p-6 shadow-ambient">
          <p className="font-body text-label-sm uppercase text-primary">Owner Studio</p>
          <h1 className="mt-2 font-display text-display-sm text-on-surface md:text-display-lg">
            Your fleet, curated post by post.
          </h1>
          <p className="mt-3 font-body text-body-md text-on-surface/80">
            Manage your own car listings, monitor rental statuses, and publish new premium offers from one place.
          </p>
          <div className="mt-5">
            <Link to="/owner/create-post" className="no-underline">
              <PrimaryButton fullWidth={false} className="px-6 py-2.5">
                Create Post
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-4">
        <article className="rounded-lg bg-surface-bright p-5 shadow-ambient">
          <p className="font-body text-label-sm uppercase text-on-surface/60">Total Posts</p>
          <p className="mt-2 font-display text-display-sm text-on-surface">{stats.totalPosts}</p>
        </article>
        <article className="rounded-lg bg-surface-bright p-5 shadow-ambient">
          <p className="font-body text-label-sm uppercase text-on-surface/60">Active</p>
          <p className="mt-2 font-display text-display-sm text-on-surface">{stats.active}</p>
        </article>
        <article className="rounded-lg bg-surface-bright p-5 shadow-ambient">
          <p className="font-body text-label-sm uppercase text-on-surface/60">Pending</p>
          <p className="mt-2 font-display text-display-sm text-on-surface">{stats.pending}</p>
        </article>
        <article className="rounded-lg bg-surface-bright p-5 shadow-ambient">
          <p className="font-body text-label-sm uppercase text-on-surface/60">Rented</p>
          <p className="mt-2 font-display text-display-sm text-on-surface">{stats.rented}</p>
        </article>
      </section>

      <section className="mt-8 rounded-card bg-surface-dim p-6 md:p-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-display text-headline-sm text-on-surface">Owner Posts</h2>
          <Link to="/owner" className="font-body text-body-md text-primary no-underline">
            Open dashboard
          </Link>
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </OwnerPageLayout>
  );
}
