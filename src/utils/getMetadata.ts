async function getMetadata(metadataURI: string) {
    try {
        const httpURL = `https://node2.irys.xyz/${metadataURI.split("//")[1]}`
        const headersList = {
            "Content-Type": "application/json",
        };

        const response = await fetch(httpURL, {
            method: "GET",
            headers: headersList,
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export default getMetadata;
