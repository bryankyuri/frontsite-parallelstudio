import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../styles/WorkDetail.module.scss";
import stylesWork from "../styles/Works.module.scss";
import { AppContext } from "../context/AppContext";

const WorkDetail = () => {
  const { workId } = useParams();
  const { deviceType } = useContext(AppContext);
  // Mock data - in a real app, you would fetch this based on the workId
  const work = {
    id: workId,
    title: "Video Title",
    client: "Client Name",
    credits: [
      { role: "Director", name: "Your Name" },
      { role: "Producer", name: "Your Name" },
      { role: "DOP", name: "Your Name" },
      { role: "Colorist", name: "Your Name" },
      { role: "Visual Effect", name: "Your Name" },
      { role: "Motion Graphic", name: "Your Name" },
    ],
    images: [
      "/path-to-image-1.jpg",
      "/path-to-image-2.jpg",
      "/path-to-image-3.jpg",
      "/path-to-image-4.jpg",
      "/path-to-image-5.jpg",
      "/path-to-image-6.jpg",
      "/path-to-image-7.jpg",
      "/path-to-image-8.jpg",
      "/path-to-image-9.jpg",
      "/path-to-image-10.jpg",
    ],
    relatedWorks: [
      {
        id: 1,
        title: "PROJECT_NAME",
        client: "CLIENTS",
        category: "COLOR GRADING",
        imageUrl: "/assets/works/work1.jpg",
      },
      {
        id: 2,
        title: "PROJECT_NAME",
        client: "CLIENTS",
        category: "CGI",
        imageUrl: "/assets/works/work2.jpg",
      },
      {
        id: 3,
        title: "PROJECT_NAME",
        client: "CLIENTS",
        category: "COLOR GRADING",
        imageUrl: "/assets/works/work3.jpg",
      },
    ],
  };

  return (
    <div className={styles.workDetail}>
      <div className="w-full mx-auto">
        <div
          className={`w-full bg-black text-white relative ${styles.heroBanner}`}
          style={{
            height:
              deviceType === "desktop"
                ? "calc(100vh - 62px)"
                : "calc(100vh - 66px)",
            backgroundImage: `url('/hero-banner-detailwork.jpg')`,
            backgroundSize:
              deviceType === "desktop" ? "100% auto" : "auto 100%",
            backgroundPosition:
              deviceType === "desktop" ? `center 0px` : "center 0px",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Project Details */}
        <div className="mb-16">
          {/* <div className="grid grid-cols-2 gap-8 border-t border-gray-200 py-4">
            <div>
              <span className="text-sm text-gray-500">CLIENT</span>
              <p>{work.client}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">TITLE</span>
              <p>{work.title}</p>
            </div>
          </div> */}

          {/* Credits */}
          {/* <div className="border-t border-gray-200 py-4">
            <span className="text-sm text-gray-500">CREDITS</span>
            <div className="grid grid-cols-2 gap-8 mt-2">
              {work.credits.map((credit, index) => (
                <div key={index} className="flex justify-between">
                  <span>{credit.name}</span>
                  <span>{credit.role}</span>
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* More Works */}
        <div className="mb-16 px-5">
          <h2 className="font-bold text-left mb-10 text-black">MORE WORKS</h2>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            {work.relatedWorks.map((work) => (
              <Link to={`/works/${work.id}`} className={stylesWork.workItem}>
                <div className="overflow-hidden">
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full object-cover transition-transform duration-700 hover:scale-[107%]"
                  />
                  <div className="mt-[20px] flex justify-between">
                    <div className="text-black">
                      <span>{work.title}</span>
                      <span> | {work.client}</span>
                    </div>
                    <div className="text-[#B4B4B4]">{work.category}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
