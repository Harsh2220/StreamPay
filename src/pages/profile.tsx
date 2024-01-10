import Container from "@/components/ui/container";

export default function Profile() {
  return (
    <Container>
      <div className="border rounded-xl my-32">
        <div className="flex flex-wrap divide-y sm:divide-y-0 sm:divide-x">
          <div className="w-full sm:w-1/2">
            <div className="p-12 text-center">
              <img
                className="mb-7 mx-auto"
                src="https://shuffle.dev/dashy-assets/images/empty3.png"
                alt=""
              />
              <h3 className="mb-3 font-heading text-lg font-semibold">
                Create your first project on Dashy
              </h3>
              <p className="mb-7 text-neutral-500">
                Establish a clear vision so that managers in your organization
                can mobilize their teams to all work in the same direction.
              </p>
              <a
                className="inline-flex flex-wrap items-center justify-center px-6 py-2.5 text-sm text-neutral-50 font-medium bg-gradient-purple-left hover:bg-gradient-purple-left-dark rounded-lg transition duration-300"
                href="#"
              >
                <svg
                  className="mr-2.5"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.74935 2.66663C8.74935 2.25241 8.41356 1.91663 7.99935 1.91663C7.58514 1.91663 7.24935 2.25241 7.24935 2.66663H8.74935ZM7.24935 13.3333C7.24935 13.7475 7.58514 14.0833 7.99935 14.0833C8.41356 14.0833 8.74935 13.7475 8.74935 13.3333H7.24935ZM13.3327 8.74996C13.7469 8.74996 14.0827 8.41417 14.0827 7.99996C14.0827 7.58575 13.7469 7.24996 13.3327 7.24996L13.3327 8.74996ZM2.66602 7.24996C2.2518 7.24996 1.91602 7.58575 1.91602 7.99996C1.91602 8.41417 2.2518 8.74996 2.66602 8.74996L2.66602 7.24996ZM7.24935 2.66663V13.3333H8.74935V2.66663H7.24935ZM13.3327 7.24996L2.66602 7.24996L2.66602 8.74996L13.3327 8.74996L13.3327 7.24996Z"
                    fill="#F9FAFB"
                  ></path>
                </svg>
                <span className="font-medium">Create A Project</span>
              </a>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <div className="p-12 text-center">
              <img
                className="mb-7 mx-auto"
                src="https://shuffle.dev/dashy-assets/images/empty4.png"
                alt=""
              />
              <h3 className="mb-3 font-heading text-lg font-semibold">
                Add your first task
              </h3>
              <p className="mb-7 text-neutral-500">
                Create a goal for one of your teams that will appear in the team
                hub-that’s how everyone will know what to work on.
              </p>
              <a
                className="inline-flex flex-wrap items-center justify-center px-6 py-2.5 text-sm border hover:border-neutral-200 rounded-lg"
                href="#"
              >
                <svg
                  className="mr-2.5"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.74935 2.66663C8.74935 2.25241 8.41356 1.91663 7.99935 1.91663C7.58514 1.91663 7.24935 2.25241 7.24935 2.66663H8.74935ZM7.24935 13.3333C7.24935 13.7475 7.58514 14.0833 7.99935 14.0833C8.41356 14.0833 8.74935 13.7475 8.74935 13.3333H7.24935ZM13.3327 8.74996C13.7469 8.74996 14.0827 8.41417 14.0827 7.99996C14.0827 7.58575 13.7469 7.24996 13.3327 7.24996L13.3327 8.74996ZM2.66602 7.24996C2.2518 7.24996 1.91602 7.58575 1.91602 7.99996C1.91602 8.41417 2.2518 8.74996 2.66602 8.74996L2.66602 7.24996ZM7.24935 2.66663V13.3333H8.74935V2.66663H7.24935ZM13.3327 7.24996L2.66602 7.24996L2.66602 8.74996L13.3327 8.74996L13.3327 7.24996Z"
                    fill="#F9FAFB"
                  ></path>
                </svg>
                <span className="font-medium">Add A Task</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
