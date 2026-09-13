import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInTab from "./_components/signin-tab";
import SignUpTab from "./_components/sign-up-tab";

export default function loginPage() {
  return (
    <Tabs defaultValue={"signin"} className={"m-5"}>
      <TabsList className={"m-auto"}>
        <TabsTrigger className={""} value={"signin"}> Sign In</TabsTrigger>
        <TabsTrigger value={"signup"}> Sign Up</TabsTrigger>
      </TabsList>

      <Card className={"w-1/2 m-auto"}>
        <TabsContent value={"signin"}>
          <CardHeader className={"text-2xl"}>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <SignInTab />
          </CardContent>
        </TabsContent>

        <TabsContent value={"signup"}>
          <CardHeader className={"text-2xl"}>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUpTab />
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
}
