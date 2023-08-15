import { Link } from "react-router-dom"
import WebIcon from "../assets/WebIcon.svg"

export type CreatorProps = {
  id: number
  name: string
  description: string
  url: string
  imageURL: string

  // social media links
  youtube?: string
  twitter?: string
  instagram?: string
}

const ContentCreatorCard = ({id, name, description, url, imageURL }: CreatorProps) => {
  return (
    <div className="content-creator-card" style={{ backgroundImage: `url(${imageURL})` }}>
      <article>
        <h3>{name}
        <Link to={`/${id}`}>
          VIEW
        </Link>
        <Link to={`/edit/${id}`}>
          EDIT
        </Link>
        </h3>
        
        {url && (
          <a href={url}>
            <img src={WebIcon} alt="Website Icon" />
          </a>)
        }

        <p>{description}</p>
      </article>
    </div>
  )
}

export default ContentCreatorCard