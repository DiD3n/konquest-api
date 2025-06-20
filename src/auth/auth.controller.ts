import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import debugRouter from "./provider/debug.controller.ts";
import googleRouter from "./provider/google.controller.ts";
import appleRouter from "./provider/apple.controller.ts";

const router = new Router();

router.use(debugRouter.routes(), debugRouter.allowedMethods());
router.use(googleRouter.routes(), googleRouter.allowedMethods());
router.use(appleRouter.routes(), appleRouter.allowedMethods());

export default router; 