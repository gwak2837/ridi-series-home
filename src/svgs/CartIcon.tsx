interface Props {
  className?: string
}

export default function CartIcon({ className = '' }: Props) {
  return (
    <svg className={className} height="24" viewBox="0 0 24 24" width="24">
      <path
        d="M0.200195 2.99971C0.200195 2.55788 0.558367 2.19971 1.0002 2.19971H3.83803C4.20178 2.19971 4.51974 2.44511 4.61192 2.79698L5.34983 5.61393C5.411 5.59896 5.47494 5.59102 5.54073 5.59102H22.0002C22.26 5.59102 22.5036 5.71719 22.6535 5.92938C22.8034 6.14158 22.841 6.41337 22.7542 6.65826L19.3488 16.267C19.2356 16.5863 18.9335 16.7998 18.5947 16.7998H7.24343C6.87968 16.7998 6.56172 16.5544 6.46955 16.2025L3.2206 3.79971H1.0002C0.558367 3.79971 0.200195 3.44154 0.200195 2.99971ZM5.76295 7.19102L7.86086 15.1998H18.0295L20.8679 7.19102H5.76295ZM9.00024 20.4998C9.00024 21.3282 8.32867 21.9998 7.50024 21.9998C6.67181 21.9998 6.00024 21.3282 6.00024 20.4998C6.00024 19.6714 6.67181 18.9998 7.50024 18.9998C8.32867 18.9998 9.00024 19.6714 9.00024 20.4998ZM18.5002 21.9998C19.3286 21.9998 20.0002 21.3282 20.0002 20.4998C20.0002 19.6714 19.3286 18.9998 18.5002 18.9998C17.6718 18.9998 17.0002 19.6714 17.0002 20.4998C17.0002 21.3282 17.6718 21.9998 18.5002 21.9998Z"
        fill="#141414"
      />
    </svg>
  )
}