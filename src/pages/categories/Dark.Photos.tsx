import NavigationBarComponent from "../../components/Navigation.Bar.Component";
import { useState, useEffect } from "react";
import axios from "axios";
import PhotoViewComponent from "../../components/Photo.View.Component";

interface Resource {
  id: string;
  resource_url: string;
  category: string;
  resource_admin: string;
  resource_title: string;
  resource_id: string;
  upload_date: string | number;
}

function DarkPhotos() {
  const [resources, setResources] = useState<Resource[]>([]);

  async function FetchResources() {
    try {
      const request = await axios.get("http://localhost:3500/resources", {
        headers: {
          Authorization: "",
        },
      });

      const response = await request.data;
      setResources(
        response.filter((index: Resource) => {
          return index.category === "dark";
        })
      );
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    FetchResources();
  }, []);

  try {
    return resources.length > 0 ? (
      <>
        <NavigationBarComponent />
        <br />
        <section className="dark-photos">
          <h1>Beautiful photos from dark photos</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
            optio rem quidem fugiat voluptatum facere deleniti commodi! Debitis
            nesciunt eveniet eius voluptatem illo illum quam.
          </p>
          <br />
          <div className="photos">
            {resources.map((index: Resource) => (
              <article
                className="photo_resource"
                key={index.id}
                title={`${index.resource_title} uploaded by ${index.resource_admin}`}
              >
                <img
                  src={index.resource_url}
                  alt={`photo from ${index.category}`}
                  onClick={(event) => {
                    (
                      window.document.querySelector(
                        ".photo-view"
                      ) as HTMLElement
                    ).style.display = "flex";
                    (
                      window.document.querySelector(
                        ".img-placeholder"
                      ) as HTMLImageElement
                    ).src = (event.target as HTMLImageElement).src;
                    const FoundResource: Resource = resources.find(
                      (index: Resource) => {
                        return (
                          index.resource_url ===
                          (event.target as HTMLImageElement).src
                        );
                      }
                    )!;
                    (
                      window.document.querySelector(
                        ".resource_admin"
                      ) as HTMLElement
                    ).textContent = FoundResource.resource_admin;
                    (
                      window.document.querySelector(
                        ".upload_date"
                      ) as HTMLElement
                    ).textContent = index.upload_date as string;
                    (
                      window.document.querySelector(
                        ".resource_collection_ul"
                      ) as HTMLAnchorElement
                    ).href = `/photos/categories/${FoundResource.category}`;
                  }}
                />
                <div className="photo-details">
                  <section></section>
                </div>
              </article>
            ))}
          </div>
          <PhotoViewComponent />
        </section>
      </>
    ) : (
      <>
        <NavigationBarComponent />
        <div className="img-wrapper">
          <img src="/3363936.webp" alt="" />
          <p>No photos were found, try reloading the page!</p>
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
  }
}

export default DarkPhotos;
