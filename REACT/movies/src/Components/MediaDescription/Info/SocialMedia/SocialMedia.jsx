import React from 'react'
import classes from './SocialMedia.module.css'
import {
    FaInstagram,
    FaTwitter,
    FaLink,
    FaImdb,
    FaFacebookSquare,
} from 'react-icons/fa';
import { useSearch } from '../../../../Utils/hooks/useSearch';


const SocialMedia = ({ media, id, homepage, personData }) => {
    const [data] = useSearch(media, id, 1, "external_ids");

    const socialMediaObj = {
        imdb_id: (codigoLink) =>
            (<a href={media === 'person'? `https://www.imdb.com/name/${codigoLink}` : `https://www.imdb.com/title/${codigoLink}`}> < FaImdb className={classes.icon} /></a>),
        facebook_id: (codigoLink) =>
            (<a href={`https://www.facebook.com/${codigoLink}`}> <FaFacebookSquare className={classes.icon} /></a>),
        instagram_id: (codigoLink) =>
            (<a href={`https://www.instagram.com/${codigoLink}`}> < FaInstagram className={classes.icon} /></a>),
        twitter_id: (codigoLink) =>
            (<a href={`https://twitter.com/${codigoLink}`}> <FaTwitter className={classes.icon} /></a>),
        homepage: (codigoLink) =>
            (<a href={`${codigoLink}`}> <FaLink className={classes.icon} /></a>)
    }
    const socialMediaArr = Object.keys(socialMediaObj)


    if(personData){
        return (
            <div>
                {socialMediaArr.map(element => {

                    if (element !== "homepage") {
                        return (personData[element]) && (socialMediaObj[element](personData[element]))
                    }
                    return (personData.homepage && (socialMediaObj[element](homepage)))
                })
                }
            </div>
        )
    }
    if (!personData && data) {
        return (
            <div>
                {socialMediaArr.map(element => {

                    if (element !== "homepage") {
                        return (data[element]) && (socialMediaObj[element](data[element]))
                    }
                    return (socialMediaObj[element](homepage))
                })
                }
            </div>
        )
    }

    return null

}

export default SocialMedia
