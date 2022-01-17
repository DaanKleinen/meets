import React from 'react'
import {Link } from "react-router-dom";
import { useState } from 'react';

const Navigation = () => {


    const [addEvent, setAddEvent] = useState(false)
    const [index, setIndex] = useState(0)

    return (
        <div>
        <div id='navigation'>
        <Link onClick={() => {setAddEvent(false); setIndex(0)}} to="/"><svg className={index === 0 ? "navActive" : ""} xmlns="http://www.w3.org/2000/svg" fill='#fff' width="35" height="35" viewBox="0 0 24 24"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/></svg></Link>
        <Link onClick={() => {setAddEvent(false); setIndex(1)}} to="/map"><svg className={index === 1 ? "navActive" : ""} xmlns="http://www.w3.org/2000/svg" fill='#fff' width="35" height="35" viewBox="0 0 24 24"><path d="M12 0c-3.148 0-6 2.553-6 5.702 0 4.682 4.783 5.177 6 12.298 1.217-7.121 6-7.616 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 16l-6.707-2.427-5.293 2.427-5.581-2.427-6.419 2.427 4-9 3.96-1.584c.38.516.741 1.08 1.061 1.729l-3.523 1.41-1.725 3.88 2.672-1.01 1.506-2.687-.635 3.044 4.189 1.789.495-2.021.465 2.024 4.15-1.89-.618-3.033 1.572 2.896 2.732.989-1.739-3.978-3.581-1.415c.319-.65.681-1.215 1.062-1.731l4.021 1.588 3.936 9z"/></svg></Link>
        <svg onClick={() => {setAddEvent(!addEvent)}} xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 50 50" id="addIcon">
            <g id="Group_5" data-name="Group 5" transform="translate(-158 -627)">
                <circle id="Ellipse_1" data-name="Ellipse 1" cx="25" cy="25" r="25" transform="translate(158 627)" fill={addEvent ? "#F73D3D" : "#3d9bf7"}/>
                <g id="Icon_feather-plus" data-name="Icon feather-plus" transform={addEvent ? "translate(183 638) rotate(45)": "translate(172.271 641.271) "}>
                    <path id="Path_2" data-name="Path 2" d="M18,7.5V28.958" transform="translate(-7.271 -7.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                    <path id="Path_3" data-name="Path 3" d="M7.5,18H28.958" transform="translate(-7.5 -7.271)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                </g>
            </g>
        </svg>
        <Link onClick={() => {setAddEvent(false); setIndex(3)}} to="/"><svg className={index === 3 ? "navActive" : ""} xmlns="http://www.w3.org/2000/svg" fill='#fff' width="35" height="35" viewBox="0 0 24 24"><path d="M10 3.002c4.411 0 8 2.849 8 6.35 0 3.035-3.029 6.311-7.925 6.311-1.58 0-2.718-.317-3.718-.561-.966.593-1.256.813-3.006 1.373.415-1.518.362-2.182.331-3.184-.837-1.001-1.682-2.069-1.682-3.939 0-3.501 3.589-6.35 8-6.35zm0-2.002c-5.281 0-10 3.526-10 8.352 0 1.711.615 3.391 1.705 4.695.047 1.527-.851 3.718-1.661 5.312 2.168-.391 5.252-1.258 6.649-2.115 1.181.289 2.312.421 3.382.421 5.903 0 9.925-4.038 9.925-8.313 0-4.852-4.751-8.352-10-8.352zm11.535 11.174c-.161.488-.361.961-.601 1.416 1.677 1.262 2.257 3.226.464 5.365-.021.745-.049 1.049.138 1.865-.892-.307-.979-.392-1.665-.813-2.127.519-4.265.696-6.089-.855-.562.159-1.145.278-1.74.364 1.513 1.877 4.298 2.897 7.577 2.1.914.561 2.933 1.127 4.352 1.385-.53-1.045-1.117-2.479-1.088-3.479 1.755-2.098 1.543-5.436-1.348-7.348zm-15.035-3.763c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071z"/></svg></Link>
        <Link onClick={() => {setAddEvent(false); setIndex(4)}} to="/"><svg className={index === 4 ? "navActive" : ""} xmlns="http://www.w3.org/2000/svg" fill='#fff' width="35" height="35" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"/></svg></Link>
        </div>

            <div className={addEvent ? "blur" : ""}></div>
        
            <div id="addWrapper" className={addEvent ? "addWrapperToggle" :""}>
                <Link onClick={() => {setAddEvent(false); setIndex(5)}} to="/createEvent"><div id="createEvent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill='#fff' width="35" height="35" viewBox="0 0 24 24"><path d="M17 3v-2c0-.552.447-1 1-1s1 .448 1 1v2c0 .552-.447 1-1 1s-1-.448-1-1zm-12 1c.553 0 1-.448 1-1v-2c0-.552-.447-1-1-1-.553 0-1 .448-1 1v2c0 .552.447 1 1 1zm13 13v-3h-1v4h3v-1h-2zm-5 .5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5zm11 0c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-14.237 3.5h-7.763v-13h19v1.763c.727.33 1.399.757 2 1.268v-9.031h-3v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-9v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-3v21h11.031c-.511-.601-.938-1.273-1.268-2z"/></svg>
                    <p>Create event</p>
                </div>
                </Link>

                <div id="writePost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill='#fff' width="35" height="35" viewBox="0 0 24 24"><path d="M18 14.45v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023zm1.473-10.615l1.707 1.707-9.281 9.378-2.23.472.512-2.169 9.292-9.388zm-.008-2.835l-11.104 11.216-1.361 5.784 5.898-1.248 11.103-11.218-4.536-4.534z"/></svg>
                    <p>Write a post</p>
                </div>
        </div>
        </div>
    )
}

export default Navigation
