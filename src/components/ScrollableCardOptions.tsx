import Text from "./Text"

interface ScrollableCardOptionsProps {
    options: OptionCardProps[]
}

export default function ScrollableCardOptions({options}: ScrollableCardOptionsProps) {
    
    
    return (
        <div className='flex flex-row mx-2 w-auto max-w-[90svw] h-[20rem] bg-white rounded-lg overflow-x-auto'>
            {options.map((option, i) => (
                <div className="flex items-center justify-center p-2 aspect-[341/860]">
                    <OptionCard bg={option.bg} title={option.title} key={i}/>
                </div>
            ))}
        </div>
    )
}

interface OptionCardProps {
    bg: string,
    title: string
}

function OptionCard({bg, title}: OptionCardProps) {
    return (
        <button 
            className={`flex items-end justify-center bg-cover bg-no-repeat size-full rounded-lg 
                transition-all duration-500 hover:opacity-90 hover:shadow-black hover:shadow-lg`} 
            style={{
                backgroundImage: `url(${bg})`
            }}
        >
            <Text as='h1' className="text-white font-navBarButtons">{title.toUpperCase()}</Text>
        </button>
    )
}