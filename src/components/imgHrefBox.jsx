import bg from 'assets/image/view/view-1.jpg'
const ImgHrefBox = (props) => {
    let { children } = props
    //@ STYLE
    const handleStyle = {
        bg: {
            backgroundImage: `url(${bg})`
        }
    }
    return (
        <div className='img-href-box px-3' style={handleStyle.bg}>
            <div className='text'>{
                children
            }</div>
        </div >
    )
}
export default ImgHrefBox