import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./SalesContentMenu";

export default {
  title: "Components/Organisms/Menu/SalesContent",
  component: Component,
  args: {
    menus: [],
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
