import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./NormalText";

export default {
  title: "Components/Atoms/Text/NormalText",
  component: Component,
  args: {
    text: "aaaaaaa\ntestesttetgsdfs",
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
