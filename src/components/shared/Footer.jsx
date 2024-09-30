import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/" >
          <h1 className="p-bold-20 text-primary-500">Connect Spot</h1>
        </Link>
        <p>2024 Connect Spot. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
