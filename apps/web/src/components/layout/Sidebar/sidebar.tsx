import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

const hash = (data: string): string => {
  // make up a super simple hash function
  return btoa(data);
};

type GroupType = {
  name: string;
  id: string;
  favorite: boolean;
};

export function Sidebar({ children }: PropsWithChildren) {
  // TODO: replace with real data of the current user's favorited groups
  const groups: GroupType[] = [
    {
      name: "BTS",
      id: "254",
      favorite: true,
    },
    {
      name: "BLACKPINK",
      id: "253",
      favorite: false,
    },
    {
      id: "100",
      name: "TWICE",
      favorite: false,
    },
    {
      name: "ATEEZ",
      id: "222",
      favorite: true,
    },
  ];

  return (
    <div className="drawer">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label
          htmlFor="sidebar"
          aria-label="Open sidebar"
          className="drawer-overlay"
        />
        <ul className="menu bg-base-200 text-base-content min-h-full w-70 p-4 overflow-y-auto">
          <li>
            <Link to="/groups">All groups</Link>
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>

          <div className="divider" />

          {groups.map((group) => (
            <li key={group.id}>
              <Link to={`/groups/${group.id}`}>{group.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
