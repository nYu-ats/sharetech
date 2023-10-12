import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./SalesContentViewTemplate";

export default {
  title: "Components/Molecules/SalesContentTemplate/View",
  component: Component,
  args: {
    contents: [
      {
        title: "Sample",
        content: <div className="w-full h-96 bg-whiteSmoke animate-pulse"></div>,
      },
      {
        title: "Sample2",
      },
      {
        content: <div className="w-full h-96 bg-whiteSmoke animate-pulse"></div>,
      },
    ],
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
