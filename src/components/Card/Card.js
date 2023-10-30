import React from "react";
import { Link } from "react-router-dom";

export const Card = (props) => {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      
      <div class="px-6 py-4">
      <Link to={`/word/${props.id}`}>
        <div class="font-bold text-xl mb-2">{props.title}</div>
      </Link>
        <p class="text-gray-700 text-base italic">
          {props.comment}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Repellat incidunt placeat mollitia sit sequi fugit perspiciatis cupiditate 
          pariatur optio aperiam. Aut, repellat culpa! Cupiditate iste maxime sunt, 
          voluptatibus iusto adipisci?
        </p>
      </div>
      <div className="info px-6">
        <div className="user flex items-center gap-2">
        {props.image &&
        <img src={props.image}className="rounded-full h-6 w-6"  alt="" /> }
        <h4 className="text-sm">{props.username}</h4>
        </div>
      </div>
      <div class="flex justify-center gap-2 px-6 pt-4 pb-2">
      {props.tags &&
          props.tags.slice(0, 3).map((tag, index) => (
            <Link key={index} to={`/tag/${tag}`}>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-300 mb-2">
                {tag}
              </span>
            </Link>
          ))}
       
      </div>
      
    </div>
  );
};
