import { TagContainer } from "./styles";

interface ITagCardProps {
  tagText: string
}

export function TagCard({ tagText }: ITagCardProps) {
  return (
    <TagContainer>
      <h5>{tagText}</h5>
    </TagContainer>
  )
}