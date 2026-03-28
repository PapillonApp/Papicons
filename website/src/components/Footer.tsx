export default function Footer() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:gap-4 mt-16 md:mt-0">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        © 2026 Association Papillon - This website is open source
      </p>

      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Made with {'<3'} by the Papillon Team -{' '}
        <a href="https://papillon.bzh" className="hover:underline">
          papillon.bzh
        </a>
      </p>
    </div>
  );
}
