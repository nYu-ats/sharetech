import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./UserAdd";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Organisms/Form/SalesContentShare/UserAdd",
  component: Component,
  args: {},
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
