export default function Divider() {
  return (
    <div className="flex justify-center py-2">
      <svg
        width="200"
        height="16"
        viewBox="0 0 200 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-pink-border"
      >
        <path
          d="M0 8C10 2, 20 14, 30 8S50 2, 60 8S80 14, 90 8S110 2, 120 8S140 14, 150 8S170 2, 180 8S200 14, 200 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}