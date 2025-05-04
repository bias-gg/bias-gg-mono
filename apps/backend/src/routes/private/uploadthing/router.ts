/**
 * @remarks Note that this router uses the `/server` entrypoint
 * but we re-use it even for adapters like Express, Fastify and H3.
 * The middleware options will therefore not be accurate, but
 * for this example we don't care and don't want to duplicate
 * the router for every adapter.
 *
 * In your app, import using the correct entrypoint for your adapter.
 * @see https://docs.uploadthing.com/api-reference/server#createuploadthing
 */
import {
  createBuilder,
  type FileRouter,
} from "uploadthing/server";

export type AdapterArgs = {
  req: Request;
};

const f = createBuilder<AdapterArgs>({
  /**
   * Log out more information about the error, but don't return it to the client
   * @see https://docs.uploadthing.com/errors#error-formatting
   */
  errorFormatter: (err) => {
    console.log("Error uploading file", err.message);
    console.log("  - Above error caused by:", err.cause);

    return { message: err.message };
  },
});

/**
 * This is your Uploadthing file router. For more information:
 * @see https://docs.uploadthing.com/api-reference/server#file-routes
 */
export const uploadRouter = {
  artistImage: f(
    {
      image: {
        maxFileSize: "4MB",
        maxFileCount: 4,
      },
    },
    {
      awaitServerData: true,
    },
  )
    .middleware(({ files }) => {
      files;
      // ^?
      return {
        uploadedBy: "fake-user-id-213",
      };
    })
    .onUploadError(({ error, fileKey }) => {
      console.log("upload error", { message: error.message, fileKey });
      throw error;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("upload completed", metadata, file);
      // await new Promise((r) => setTimeout(r, 15000));
      return { foo: "bar", baz: "qux" };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
