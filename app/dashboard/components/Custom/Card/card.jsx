import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

const CustomCard = ({
  title,
  description,
  className,
  children,
  MoreOption,
  insideClassName,
  element,
}) => {
  return (
    <div className={`${className}`}>
      <Card
        className={`m-0 p-0 my-3 w-full shadow-sm bg-card dark:bg-accent ${insideClassName} `}
      >
        <div className="m-4 flex">
          <div className="flex flex-col">
            <div className="font-bold text-lg flex items-center">
              {title}
              {element}
            </div>
            <div className="font-medium  text-gray-600 dark:text-gray-400 text-sm">
              {description}
            </div>
          </div>
          {MoreOption && (
            <div className="ms-auto">
              <MoreVertical className="h-4 w-4" />
            </div>
          )}
        </div>
        {/* <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-between">
          <Button
            className="bg-primary text-white font-bold hover:bg-rose-700 hover:text-white dark:bg-primary  dark:hover:bg-destructive"
            variant="outline"
          >
            Cancel
          </Button>
          <Button>Deploy</Button>
        </CardFooter> */}
        <div className="my-3 ms-6 me-4">{children}</div>
      </Card>
    </div>
  );
};

export default CustomCard;
