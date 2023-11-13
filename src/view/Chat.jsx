import React, { useState } from "react";
import Nav from "components/layout/Nav";
import Icon from "components/Icon";
const Chat = () => {
  //聊天室
  return (
    <>
      <div className="chat-wrap">
        <div className="chat-content">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo
            officiis blanditiis sed doloremque amet et delectus recusandae quos!
            Reiciendis similique, iste sint autem doloremque beatae est
            aspernatur molestiae rerum esse. Pariatur nemo aut, amet laborum rem
            iste neque autem minima, placeat provident atque quasi porro eum ea
            vero at molestiae. Adipisci quo qui a reiciendis ab dicta
            repudiandae! Aut, dolorum? Maiores adipisci amet esse quos nesciunt
            obcaecati accusantium fugiat hic praesentium. Alias fuga deserunt
            nesciunt quos consequuntur autem totam explicabo, dolor ut similique
            ullam nostrum architecto molestias doloremque voluptatibus. Animi.
            Qui rerum consectetur explicabo aliquam maiores, sapiente incidunt
            animi ipsum voluptate dolor optio veniam cum rem, architecto enim
            vitae. Et odit modi id quod magnam, illo provident dolore natus
            minus! Repudiandae tempora laborum vero esse debitis nihil in
            repellendus illum illo voluptatum voluptates commodi corrupti ipsam
            culpa ab libero ullam, enim architecto fugit. Fugit placeat beatae
            quos commodi ipsum impedit. Praesentium consequuntur explicabo
            veritatis, nihil quibusdam ipsam natus necessitatibus sit, tempore
            nostrum, voluptates mollitia culpa obcaecati illum sed tenetur ipsum
            commodi enim et animi voluptas. Tempora, a dolorem. Dolore,
            suscipit. Fugiat eaque cupiditate iusto aut tempore nihil voluptatum
            illo labore, molestias expedita repellat corporis temporibus
            similique sit? Placeat minus sit optio in, ipsam hic dicta vero
            corporis tenetur, ullam omnis! Soluta consequuntur nulla mollitia,
            est veritatis, tenetur omnis sequi asperiores esse iure placeat,
            nesciunt ratione. Obcaecati quia repellendus ducimus quibusdam
            assumenda sit maiores laborum, laboriosam totam sed cumque! Quam,
            repellat? Voluptatem soluta itaque incidunt voluptas provident quod
            consequatur sint deleniti iste. Quo odio eius magnam ea blanditiis.
            Expedita vero voluptas, aperiam natus placeat ducimus non aliquid.
            Repellat sequi placeat ipsam. Error similique, ut alias laudantium
            assumenda, dicta consequatur ea, minus architecto voluptate nesciunt
            excepturi nobis amet minima sit aut omnis iste fugiat fugit itaque
            illo? Commodi quos modi eveniet repudiandae!
          </p>
        </div>
        <div className="container">
          <div className="col-12">
            <div className="chat-input-wrap">
              <div className="chat-input d-flex align-items-center">
                <input
                  type="text"
                  className="form-control form-control-lg rounded-pill"
                />
                <button className="btn chat-input-icon">
                  <Icon icon="send" size={24} color="#252525" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Nav />
      </div>
    </>
  );
};
export default Chat;
