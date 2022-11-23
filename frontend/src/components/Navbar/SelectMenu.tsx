import { ElementSelect, MenuSelect,ImgSelect } from './styles'
import arabic from '../../assets/flags/arabic.png'
import english from '../../assets/flags/english.png'
interface Props {
    hide: boolean
}

export function SelectMenu(props: Props){
   return(
    <div>
            {
        props.hide ? (
            <MenuSelect>
            <ElementSelect>
            <ImgSelect src={arabic} />
            <span>العربية</span>
            </ElementSelect>
            <ElementSelect>
            <ImgSelect src={english} />
                <span>English</span>
                </ElementSelect>
        </MenuSelect>
        ) : null
    }
    </div>
    )
}