
import Albums from '../components/Albums'
import SideBar from '../components/SideBar'
import Songs from '../components/Song'



const Page = () => {
  
  return (
    <div className="flex font-poppins  bg-black text-white overflow-hidden">
      <SideBar />
      <div className='w-full mx-5'>
        <Songs />
        <Albums />
      </div>

      
    </div>
  )
}

export default Page