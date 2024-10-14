import './style.css'

export const Tab = ({ tab }) => {

  return (
    <div className="tab">
      <img src={`img/${tab}.png`} alt={`${tab}`} className='tab-icon' />
      <p className="tab-name">{tab}</p>
    </div>
  );
}