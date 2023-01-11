import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./NormalTab";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Molecules/Tab/NormalTab",
  component: Component,
  args: {
    tabs: [
      {
        tabName: "Sample1",
      },
      {
        tabName: "Sample2",
        content: <div className="bg-deepBlue h-96 text-white">Sample2</div>,
      },
      {
        tabName: "Sample3",
        content: <div className="bg-lightBlue h-96 text-white">Sample3</div>,
      },
    ],
    active: 0,
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
