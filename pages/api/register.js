import { withSessionAPI } from "@/lib/session";
import { addCredential } from "@/lib/db";
import { verifyCredentials } from "@/lib/utils";

async function handler(request, response) {
    try {
        const { credentialID, publicKey } = await verifyCredentials(request);
        const cred = await addCredential(request.body.id, {credentialID, publicKey});
        request.session.userId = request.body.id;
        await request.session.save();
        response.status(200).json({ userId: request.body.id });
    } catch (error) {
        response.status(500).json({ message: error });
    }
}

export default withSessionAPI(handler);