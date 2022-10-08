import React from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import {Link} from "react-router-dom";
import Menu from "../components/Menu";

const Single = () => {
    return (
        <div className="single">
            <div className="content">
                <img src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Single post image"/>
                <div className="user">
                    <img src="https://img.freepik.com/premium-photo/caucasian-handsome-man-posing-with-arms-at-hip-and-smiling-over-isolated-purple-wall_1368-89876.jpg?w=360" alt="User avatar"/>
                    <div className="info">
                        <span>John</span>
                        <p>Posted 2 days ago</p>
                    </div>
                    <div className="edit">
                        <Link to={`/write?edit=2`}>
                            <img src={Edit} alt="Edit" />
                        </Link>
                        <img src={Delete} alt="Delete"/>
                    </div>
                </div>
                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, ipsum?</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias animi at culpa distinctio eum, explicabo fugit inventore iusto libero minima molestiae nihil nulla odio quibusdam, sapiente tenetur veniam voluptate.
                    <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam cupiditate doloremque esse est excepturi illo illum in inventore ipsam, molestias pariatur perferendis quaerat quasi recusandae reiciendis repellendus sapiente. Omnis.
                    <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque dolores dolorum eius, esse eum exercitationem expedita ipsum, laudantium maxime modi nisi numquam perspiciatis quae quas quis ratione velit vero.
                    <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad aliquam asperiores aut blanditiis commodi culpa ducimus, eos expedita fugiat laudantium molestiae mollitia non optio quos repudiandae sint sunt, voluptatibus.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam error eveniet facere iure neque nihil obcaecati optio. Autem cupiditate, deleniti distinctio doloribus iste, nam nihil similique temporibus totam vero voluptatum.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi impedit non officia reiciendis suscipit. At dicta molestiae odit soluta voluptates! Est incidunt ipsa iusto mollitia optio, temporibus totam vero voluptatum.
                </p>
            </div>
            <Menu />
        </div>
    );
};

export default Single;