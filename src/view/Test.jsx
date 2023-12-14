import { callAttractions } from 'API/callAttractions';
import { callFoodShop } from 'API/callFoodShop';
import React, { useEffect, useState } from 'react';
import cityData from 'assets/data/cityCountyData.json'
import callPositionInfo from 'API/callPostionInfo';
const Test = () => {
    useEffect(() => {
        callFoodShop('安平區')
    }, [])
    return (
        <>
            <div className='bg-primary'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ratione perferendis quasi tenetur temporibus blanditiis a laboriosam minus nulla, quibusdam iusto. Id minima, fuga accusamus illo ipsum veritatis veniam minus.
                Dolorum optio impedit laborum mollitia! Consectetur fugit ad mollitia sapiente voluptates, commodi quod ullam facilis cupiditate sed quasi optio quo aspernatur, veritatis exercitationem vero officia nam ab omnis maxime illum!
                Autem officia molestias praesentium recusandae, enim aliquam eum voluptatum sunt, impedit explicabo maxime. Dicta placeat nam nostrum perferendis unde quasi corporis fugit dignissimos atque, sapiente at odio similique quidem suscipit!
                Doloremque aut consectetur odio incidunt numquam officia cumque accusamus, doloribus et culpa adipisci dolor illo. Labore ipsa error hic, iusto corrupti ratione officia commodi aspernatur quas quo molestias rerum neque!
                Vitae, vero placeat! Culpa optio eligendi nemo facere aspernatur ab nostrum a dolor ducimus? Ullam molestiae cumque dolore ut quae consequatur deleniti, sequi, animi qui omnis obcaecati sunt molestias quidem!
                Quaerat neque totam atque! Similique ex quos, nihil deserunt dolor iste blanditiis animi, repellat odio, ullam ipsam soluta eaque! Nostrum, nobis neque? Eum hic fugit porro ex odio, voluptatem quod.
                Ut dolor ad quia, fugiat officiis rerum laborum unde? Tempora at id asperiores tempore aspernatur quis atque incidunt porro hic, nemo repudiandae harum repellat vitae? Rem doloremque sequi fuga possimus!
                Nihil voluptatibus dolorem rem earum qui, officia atque ab nulla voluptate eveniet explicabo eligendi minus perferendis corporis saepe nobis magnam in adipisci non. Soluta illo sint ipsum laborum similique? Sapiente!
                Enim autem qui maxime esse, aliquam sunt vel id ratione totam labore molestias ea necessitatibus facere quisquam similique soluta ducimus ad, culpa quo repellat sed animi ipsa? Quisquam, numquam tempora.
                Fugiat eligendi voluptates quos tempore nemo architecto voluptas necessitatibus reiciendis. Quod, vel! Corrupti officiis molestias quia qui suscipit enim, soluta in adipisci ducimus blanditiis asperiores sunt iusto possimus quidem hic.
            </div>
        </>
    )
}
export default Test