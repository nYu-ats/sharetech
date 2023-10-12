import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./SalesContentEdit.template";

export default {
  title: "Components/Templates/SalesContent/Edit",
  component: Component,
  args: {
    salesContentForm: <div className="w-full h-96 bg-whiteSmoke animate-pulse"></div>,
    actionPanel: <div className="w-full h-8 bg-whiteSmoke animate-pulse"></div>,
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
