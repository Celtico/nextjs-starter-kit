import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="shadow-md backdrop-brightness-200">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <Image src={"/next.svg"} width={100} height={100} alt={"next"} />
        </div>
      </footer>
    </>
  );
}
