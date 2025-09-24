import React, { useState } from 'react'
import axios from 'axios';
import './GithubSearch.css';
import { FaMapMarkerAlt } from 'react-icons/fa'; 
import { PiBuildingsFill } from 'react-icons/pi';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';
import image1 from './GitHub Images/image1.jpg';
import image2 from './GitHub Images/image2.jpg';
import image3 from './GitHub Images/image3.jpg';
import { FiRefreshCw } from "react-icons/fi";

const GithubSearch = () => {

    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            setProfile(response.data);
            setError(null);
        } catch(error) {
            setProfile(null);
            setError('User Not Found');
        }
    };

    // ADD THIS FUNCTION: It resets the state to allow for a new search.
    const handleClear = () => {
        setUsername('');
        setProfile(null);
        setError(null);
    };

  return (
    <div className='main-container'>
      <h1 className='main-heading'>GitHub Profile Detective</h1>
      <form onSubmit={handleSubmit} className='search-form'>
        <input type='text' placeholder='Enter Github Username....' value={username} className='search-input' onChange={(e) => setUsername(e.target.value)}></input>
        <button type='submit' className='search-btn'>Search</button>
      </form>

      {/* Default images when no profile is searched */}
     {!profile && !error && (
        <>
        <div className="default-images">
          <img src={image1} alt="Penguin Toy" className="default-img" />
          <img src={image2} alt="Computer Monitor" className="default-img" />
          <img src={image3} alt="Man at Desk" className="default-img" />
        </div>
        {/* Footer line below images */}
        <div className="footer-line">
            <p>Explore. Discover. Connect. Your GitHub journey starts here.</p>
            <p>Connect with developers. Unlock possibilities.</p>
        </div>
        </>
)}


      {error && <p className='error-msg'>{error}</p>}

      {/* UPDATE THIS SECTION: Wrap the profile and the new button in a React Fragment <>...</> */}
      {profile && (
        <>
            <div className='profile-container'>
                <div className='profile-content'>
                    <div className='profile-img'>
                        <img src={profile.avatar_url} alt='Avatar' className='profile-avatar'></img>
                    </div>
                    <div className='profile-details'>

                        <div className='profile-des'>
                            <h2 className='profile-name'>{profile.name}</h2>
                            <p className='profile-created'>Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
                        </div>

                        <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-username'>@{profile.login}</a>
                        <p className='profile-bio'>{profile.bio}</p>

                        <div className='profile-stats'>
                            <p className='profile-repos'>Repositories<br/><span className='stats'>{profile.public_repos}</span></p>
                            <p className='profile-followers'>Followers<br/><span className='stats'>{profile.followers}</span></p>
                            <p className='profile-following'>Following<br/><span className='stats'>{profile.following}</span></p>
                        </div>

                        <div className='profile-info'>
                            <p className='profile-location'><FaMapMarkerAlt/> {profile.location}</p>
                            <p className='profile-company'><PiBuildingsFill/> {profile.company}</p>
                        </div>

                        <div className='profile-links'>
                            <a href={`https://twitter.com/${profile.twitter_username}`} target='_blank' rel="noreferrer" className='twitter-link'><FaXTwitter/>{profile.twitter_username}</a>
                            <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-url'><FaGithub/>View Profile</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* ADD THIS BUTTON: It will only appear when a profile is displayed. */}
            <button onClick={handleClear} className="clear-btn">
            <FiRefreshCw style={{ marginRight: '10px', marginBottom: '-2.7px' }} />
                Search Another GitHub Info
            </button>
        </>
      )}
    </div>
  )
}

export default GithubSearch

