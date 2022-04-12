export default function Link(props) {
  return (
    <a
      onChange={props.click}
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      className="font-space text-sm text-pink-accent font-normal uppercase cursor-pointer decoration-solid underline underline-offset-1 tracking-widest hover:text-blue-accent transition duration-150 hover:ease-in"
    >
      {props.name}
    </a>
  );
}
