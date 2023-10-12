import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./SalesContentView.template";

export default {
  title: "Components/Templates/SalesContent/View",
  component: Component,
  args: {
    title: "Sample",
    tags: <div className="w-full h-8 bg-whiteSmoke animate-pulse"></div>,
    content: <div className="w-full h-96 bg-whiteSmoke animate-pulse"></div>,
    actionPanel: <div className="w-full h-8 bg-whiteSmoke animate-pulse"></div>,
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
