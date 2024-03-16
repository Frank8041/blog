import CallToAction from '../components/CallToAction';

export default function Projects() {
    return (
        <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
        <h1 className='text-3xl font-semibold'>Projects</h1>
        <p className='text-md text-gray-500'>Just a simple chess blog! Be sure to add me as a friend on chess.com, and 
        send a challenge. I will be happy to play against you!</p>
        <CallToAction />
        </div>
    )
}